using LogWindow.Items;
using System.Threading.Tasks;
using System.Windows;

namespace LogWindow
{
    public partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private static void RunExample<T>() where T : IRunnableExample, new() => new T().Run();

        public void RunExample1(object sender, RoutedEventArgs args) => RunExample<Example1>();

        public void RunExample2(object sender, RoutedEventArgs args) => RunExample<Example2>();

        public void RunExample3(object sender, RoutedEventArgs args) => RunExample<Example3>();

        public void RunExample4(object sender, RoutedEventArgs args) => RunExample<Example4>();

        public void RunExample5(object sender, RoutedEventArgs args) => RunExample<Example5>();

        public void RunExample6(object sender, RoutedEventArgs args) => RunExample<Example6>();

        public void RunExample7(object sender, RoutedEventArgs args)
        {
            MessageBox.Show("Now we will try to sum numbers 1 and 2");
            var result = SumAsync(1, 2).Result;
            MessageBox.Show($"Result is: {result}");
        }

        public void RunExample8(object sender, RoutedEventArgs args)
        {
            MessageBox.Show("Now we will try to sum numbers 1 and 2");
            var result = SumAsyncIfYouHaveABrain(1, 2).Result;
            MessageBox.Show($"Result is: {result}");
        }

        private static async Task<int> SumAsync(int a, int b)
        {
            var result = await Task.Run(() => a + b);
            MessageBox.Show("Shit can happens.");
            return result;
        }

        private static async Task<int> SumAsyncIfYouHaveABrain(int a, int b)
        {
            var result = await Task.Run(() => a + b).ConfigureAwait(false);
            MessageBox.Show("Shit can happens.");
            return result;
        }
    }
}
