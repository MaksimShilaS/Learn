using System.Threading.Tasks;
using System.Windows;

namespace LogWindow.Items
{
    internal class Example4 : IRunnableExample
    {
        public async void Run()
        {
            var tasks = new[]
            {
                ShowMessageAsync("I'm Petya and i'm WORKING IN PARALLEL"),
                ShowMessageAsync("I'm Vasia and i'm WORKING IN PARALLEL"),
                Task.Delay(10000)
            };

            await Task.WhenAll(tasks);
            await ShowMessageAsync("GOODBYE WORLD!");

            MessageBox.Show("UNEXPECTED BOX");
        }

        private static Task ShowMessageAsync(string message)
        {
            return Task.Run(() => MessageBox.Show(message));
        }
    }
}
