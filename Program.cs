using System;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Text.Json;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace MonoTimer
{
    internal static class Program
    {
        [STAThread]
        static void Main()
        {
            ApplicationConfiguration.Initialize();
            Application.Run(new MainForm());
        }
    }

    public class MainForm : Form
    {
        private WebView2 _webView = null!;
        private bool _isCompact = false;
        private bool _isAlwaysOnTop = false;
        private bool _hotkeysEnabled = true;
        private Size _normalSize = new Size(500, 820);
        private Size _compactSize = new Size(368, 200);
        private Point _lastNormalLocation;
        private readonly string _dataFilePath;

        // Win32 API for Global Hotkeys, Dragging, and Windows 11 Rounded Corners
        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool UnregisterHotKey(IntPtr hWnd, int id);

        [DllImport("user32.dll")]
        private static extern bool ReleaseCapture();

        [DllImport("user32.dll")]
        private static extern IntPtr SendMessage(IntPtr hWnd, int Msg, int wParam, int lParam);

        [DllImport("dwmapi.dll")]
        private static extern int DwmSetWindowAttribute(IntPtr hwnd, int attr, ref int attrValue, int attrSize);

        private const int WM_HOTKEY = 0x0312;
        private const int WM_NCLBUTTONDOWN = 0x00A1;
        private const int HTCAPTION = 0x0002;

        private const uint MOD_ALT = 0x0001;
        private const uint MOD_NOREPEAT = 0x4000;

        private const int HK_PLAY_PAUSE = 101; // Alt + P
        private const int HK_NEXT_BLOCK = 102; // Alt + N
        private const int HK_RESET = 103;      // Alt + R
        private const int HK_COMPACT = 104;    // Alt + M

        private const int DWMWA_WINDOW_CORNER_PREFERENCE = 33;
        private const int DWMWCP_ROUND = 2;

        public MainForm()
        {
            Text = "MonoTimer — Temporizador Secuencial";
            FormBorderStyle = FormBorderStyle.None;
            StartPosition = FormStartPosition.CenterScreen;
            Size = _normalSize;
            MinimumSize = new Size(340, 180);
            BackColor = Color.FromArgb(246, 247, 249);
            DoubleBuffered = true;

            _dataFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "routines-data.json");

            InitializeWebView();
        }

        protected override void OnHandleCreated(EventArgs e)
        {
            base.OnHandleCreated(e);
            ApplyWindows11RoundedCorners();
            RegisterGlobalHotkeys();
        }

        private void ApplyWindows11RoundedCorners()
        {
            try
            {
                int preference = DWMWCP_ROUND;
                DwmSetWindowAttribute(Handle, DWMWA_WINDOW_CORNER_PREFERENCE, ref preference, sizeof(int));
            }
            catch
            {
                // Ignore on older OS builds
            }
        }

        private void RegisterGlobalHotkeys()
        {
            UnregisterGlobalHotkeys();
            if (!_hotkeysEnabled) return;

            // Alt + P (0x50), Alt + N (0x4E), Alt + R (0x52), Alt + M (0x4D)
            RegisterHotKey(Handle, HK_PLAY_PAUSE, MOD_ALT | MOD_NOREPEAT, 0x50);
            RegisterHotKey(Handle, HK_NEXT_BLOCK, MOD_ALT | MOD_NOREPEAT, 0x4E);
            RegisterHotKey(Handle, HK_RESET, MOD_ALT | MOD_NOREPEAT, 0x52);
            RegisterHotKey(Handle, HK_COMPACT, MOD_ALT | MOD_NOREPEAT, 0x4D);
        }

        private void UnregisterGlobalHotkeys()
        {
            try
            {
                UnregisterHotKey(Handle, HK_PLAY_PAUSE);
                UnregisterHotKey(Handle, HK_NEXT_BLOCK);
                UnregisterHotKey(Handle, HK_RESET);
                UnregisterHotKey(Handle, HK_COMPACT);
            }
            catch { }
        }

        private async void InitializeWebView()
        {
            _webView = new WebView2
            {
                Dock = DockStyle.Fill,
                DefaultBackgroundColor = Color.FromArgb(246, 247, 249)
            };
            Controls.Add(_webView);

            try
            {
                string userDataFolder = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "MonoTimer",
                    "WebView2Data"
                );

                var env = await CoreWebView2Environment.CreateAsync(null, userDataFolder);
                await _webView.EnsureCoreWebView2Async(env);

                var settings = _webView.CoreWebView2.Settings;
                settings.AreDefaultContextMenusEnabled = false;
                settings.IsStatusBarEnabled = false;
                settings.IsZoomControlEnabled = false;

                string uiFolder = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ui");
                if (!Directory.Exists(uiFolder))
                {
                    string devUiFolder = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "ui"));
                    if (Directory.Exists(devUiFolder))
                    {
                        uiFolder = devUiFolder;
                    }
                }

                _webView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                    "app.monotimer.local",
                    uiFolder,
                    CoreWebView2HostResourceAccessKind.Allow
                );

                _webView.CoreWebView2.WebMessageReceived += OnWebMessageReceived;
                _webView.CoreWebView2.Navigate("https://app.monotimer.local/index.html");
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    $"Error al iniciar el motor visual WebView2:\n{ex.Message}",
                    "MonoTimer Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        private void OnWebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            try
            {
                string json = e.WebMessageAsJson;
                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                if (!root.TryGetProperty("action", out var actionProp))
                    return;

                string action = actionProp.GetString() ?? "";

                switch (action)
                {
                    case "drag_window":
                        BeginInvoke(new Action(() =>
                        {
                            ReleaseCapture();
                            SendMessage(Handle, WM_NCLBUTTONDOWN, HTCAPTION, 0);
                        }));
                        break;

                    case "minimize":
                        BeginInvoke(new Action(() => WindowState = FormWindowState.Minimized));
                        break;

                    case "close":
                        BeginInvoke(new Action(() => Close()));
                        break;

                    case "toggle_always_on_top":
                        BeginInvoke(new Action(() =>
                        {
                            _isAlwaysOnTop = !_isAlwaysOnTop;
                            TopMost = _isAlwaysOnTop || _isCompact;
                            SendStateToWeb();
                        }));
                        break;

                    case "set_always_on_top":
                        if (root.TryGetProperty("value", out var aotVal))
                        {
                            bool targetAot = aotVal.GetBoolean();
                            BeginInvoke(new Action(() =>
                            {
                                _isAlwaysOnTop = targetAot;
                                TopMost = _isAlwaysOnTop || _isCompact;
                                SendStateToWeb();
                            }));
                        }
                        break;

                    case "toggle_compact":
                        BeginInvoke(new Action(ToggleCompactMode));
                        break;

                    case "set_compact":
                        if (root.TryGetProperty("value", out var compVal))
                        {
                            bool targetCompact = compVal.GetBoolean();
                            BeginInvoke(new Action(() =>
                            {
                                if (_isCompact != targetCompact)
                                    ToggleCompactMode();
                            }));
                        }
                        break;

                    case "set_hotkeys_enabled":
                        if (root.TryGetProperty("value", out var hkVal))
                        {
                            _hotkeysEnabled = hkVal.GetBoolean();
                            BeginInvoke(new Action(() =>
                            {
                                RegisterGlobalHotkeys();
                                SendStateToWeb();
                            }));
                        }
                        break;

                    case "set_theme_bg":
                        if (root.TryGetProperty("color", out var colorProp))
                        {
                            string hex = colorProp.GetString() ?? "#F6F7F9";
                            BeginInvoke(new Action(() =>
                            {
                                try
                                {
                                    Color c = ColorTranslator.FromHtml(hex);
                                    BackColor = c;
                                    if (_webView != null)
                                        _webView.DefaultBackgroundColor = c;
                                }
                                catch { }
                            }));
                        }
                        break;

                    case "save_data":
                        if (root.TryGetProperty("data", out var dataProp))
                        {
                            File.WriteAllText(_dataFilePath, dataProp.GetRawText());
                        }
                        break;

                    case "request_init":
                        BeginInvoke(new Action(() =>
                        {
                            SendStateToWeb();
                            if (File.Exists(_dataFilePath))
                            {
                                try
                                {
                                    string savedJson = File.ReadAllText(_dataFilePath);
                                    SendJsonToWeb("loaded_data", savedJson);
                                }
                                catch { }
                            }
                        }));
                        break;
                }
            }
            catch
            {
                // Ignore malformed messages
            }
        }

        private void ToggleCompactMode()
        {
            if (!_isCompact)
            {
                _lastNormalLocation = Location;
                _normalSize = Size;
                _isCompact = true;
                TopMost = true;
                Size = _compactSize;
            }
            else
            {
                _isCompact = false;
                TopMost = _isAlwaysOnTop;
                Size = _normalSize;
                if (_lastNormalLocation != Point.Empty)
                {
                    Location = _lastNormalLocation;
                }
            }
            ApplyWindows11RoundedCorners();
            SendStateToWeb();
        }

        private void SendStateToWeb()
        {
            if (_webView?.CoreWebView2 == null) return;
            var payload = new
            {
                type = "host_state",
                isCompact = _isCompact,
                isAlwaysOnTop = TopMost,
                pinnedAlwaysOnTop = _isAlwaysOnTop,
                hotkeysEnabled = _hotkeysEnabled
            };
            _webView.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(payload));
        }

        private void SendJsonToWeb(string type, string rawDataJson)
        {
            if (_webView?.CoreWebView2 == null) return;
            string message = $"{{\"type\":\"{type}\",\"data\":{rawDataJson}}}";
            _webView.CoreWebView2.PostWebMessageAsJson(message);
        }

        private void SendHotkeyToWeb(string command)
        {
            if (_webView?.CoreWebView2 == null) return;
            var payload = new
            {
                type = "global_hotkey",
                command = command
            };
            _webView.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(payload));
        }

        protected override void WndProc(ref Message m)
        {
            if (m.Msg == WM_HOTKEY)
            {
                int id = m.WParam.ToInt32();
                switch (id)
                {
                    case HK_PLAY_PAUSE:
                        SendHotkeyToWeb("play_pause");
                        break;
                    case HK_NEXT_BLOCK:
                        SendHotkeyToWeb("next_block");
                        break;
                    case HK_RESET:
                        SendHotkeyToWeb("reset_block");
                        break;
                    case HK_COMPACT:
                        ToggleCompactMode();
                        break;
                }
            }
            base.WndProc(ref m);
        }

        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            UnregisterGlobalHotkeys();
            base.OnFormClosing(e);
        }
    }
}
