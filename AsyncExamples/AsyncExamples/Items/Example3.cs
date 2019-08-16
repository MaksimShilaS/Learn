using System.Threading.Tasks;
using System.Windows;

namespace LogWindow.Items
{
    internal class Example3 : IRunnableExample
    {
        public async void Run()
        {
            await ShowMessageAsync("HELLO WORLD!");
            await ShowMessageAsync("GOODBYE WORLD!");

            MessageBox.Show("UNEXPECTED BOX");
        }

        private static Task ShowMessageAsync(string message)
        {
            return Task.Run(() => MessageBox.Show(message));
        }
    }
}
