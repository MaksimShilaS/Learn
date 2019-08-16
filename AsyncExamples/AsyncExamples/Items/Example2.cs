using System.Threading.Tasks;
using System.Windows;

namespace LogWindow.Items
{
    internal class Example2 : IRunnableExample
    {
        public void Run()
        {
            ShowMessageAsync("HELLO WORLD!");
            ShowMessageAsync("GOODBYE WORLD!");
        }

        private static Task ShowMessageAsync(string message)
        {
            return Task.Run(() => MessageBox.Show(message));
        }

        private static void ShowMessageAsyncVoid(string message)
        {
            Task.Run(() => MessageBox.Show(message));
        }
    }
}
