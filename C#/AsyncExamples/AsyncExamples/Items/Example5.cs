using System.Threading.Tasks;
using System.Windows;

namespace LogWindow.Items
{
    internal class Example5 : IRunnableExample
    {
        private Task _appTask;

        public async void Run()
        {
            var tasks = new[]
            {
                ShowMessageAsync("I'm Petya and i'm WORKING IN PARALLEL"),
                ShowMessageAsync("I'm Vasia and i'm WORKING IN PARALLEL"),
                Task.Delay(10000)
            };

            _appTask = Task.WhenAll(tasks);
            SayGoodbye();
            await _appTask;

            MessageBox.Show("UNEXPECTED BOX");
        }

        private void SayGoodbye()
        {
            var continueWith = _appTask.ContinueWith(t => ShowMessageAsync("GOODBYE WORLD!"));
            _appTask = continueWith.Unwrap();
        }

        private static Task ShowMessageAsync(string message)
        {
            return Task.Run(() => MessageBox.Show(message));
        }
    }
}
