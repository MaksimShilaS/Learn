using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace LogWindow.Items
{
    internal class Example6 : IRunnableExample
    {
        public async void Run()
        {
            var numbers = new[] { 1, 2, 3, 4, 5 };

            MessageBox.Show("Click OK to see what happens with usuall foreach");
            foreach (var number in numbers)
            {
                await ShowMessageAsync($"Result is '{number}'");
            }
            
            MessageBox.Show("Click OK to see what happens with LINQ foreach and async lambda");
            numbers.ToList().ForEach(async n =>
            {
                await Task.Delay(3000);
                await ShowMessageAsync($"Result is '{n}'");
            });

            await ShowMessageAsync("Did you expect this message?");
            MessageBox.Show("Click OK to see what happens with LINQ select");
            // async await can be skipped here
            var tasks = numbers.Select(async n =>
            {
                await ShowMessageAsync($"Result is '{n}'");
            });

            await Task.WhenAll(tasks);

            MessageBox.Show("GOODBYE WORLD!!!");
        }

        private static Task ShowMessageAsync(string message)
        {
            return Task.Run(() => MessageBox.Show(message));
        }
    }
}
