using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Persistence.Contexts;

namespace Infrastructure.Persistence.Seeds
{
    public static class DefaultMenuItems
    {
        public static async Task SeedAsync(ApplicationDbContext dbContext)
        {
            if (!await dbContext.MenuItems.AnyAsync())
            {
                var menuItems = new[]
                {
                    new MenuItem { Name = "Cheeseburger", Price = 5.99m, Description = "Delicious beef burger", CategoryId = 1 },
                    new MenuItem { Name = "Veggie Wrap", Price = 4.99m, Description = "Healthy veggie wrap", CategoryId = 2 },
                    new MenuItem { Name = "Chicken Wings", Price = 6.99m, Description = "Spicy chicken wings", CategoryId = 3 },
                    new MenuItem { Name = "Margherita Pizza", Price = 7.99m, Description = "Classic pizza", CategoryId = 1 },
                    new MenuItem { Name = "Chocolate Cake", Price = 3.99m, Description = "Rich chocolate cake", CategoryId = 4 },
                    new MenuItem { Name = "Caesar Salad", Price = 4.99m, Description = "Fresh salad with Caesar dressing", CategoryId = 2 },
                    new MenuItem { Name = "BBQ Ribs", Price = 12.99m, Description = "Tender BBQ ribs", CategoryId = 3 },
                    new MenuItem { Name = "Fish Tacos", Price = 5.99m, Description = "Crispy fish tacos", CategoryId = 1 },
                    new MenuItem { Name = "Spaghetti Bolognese", Price = 6.99m, Description = "Pasta with meat sauce", CategoryId = 2 },
                    new MenuItem { Name = "Ice Cream Sundae", Price = 3.49m, Description = "Vanilla ice cream with toppings", CategoryId = 4 },
                    new MenuItem { Name = "Pancakes", Price = 5.49m, Description = "Fluffy pancakes with syrup", CategoryId = 1 },
                    new MenuItem { Name = "Grilled Chicken", Price = 7.99m, Description = "Grilled chicken with herbs", CategoryId = 2 },
                    new MenuItem { Name = "Lobster Roll", Price = 9.99m, Description = "Fresh lobster roll", CategoryId = 3 },
                    new MenuItem { Name = "Fruit Smoothie", Price = 4.49m, Description = "Mixed fruit smoothie", CategoryId = 4 }
                };

                await dbContext.MenuItems.AddRangeAsync(menuItems);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
