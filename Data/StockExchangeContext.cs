using Microsoft.EntityFrameworkCore;

namespace Test.Data
{
    public class StockExchangeContext : DbContext
    {
        public StockExchangeContext(DbContextOptions<StockExchangeContext> options) : base(options) { }

        public DbSet<Orders> Orders { get; set; }
    }
}
