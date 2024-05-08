using Microsoft.AspNetCore.Mvc;


namespace Test.Controllers;

[ApiController]
[Route("[controller]")]
public class StockController : ControllerBase
{

    private static readonly string[] StockSymbols = new[]
    {
        "AAPL", "MSFT", "TSLA", "AMZN","GOOGL"
    };

    private static readonly List<StockHistory> StockHistories = new List<StockHistory>();

    private readonly ILogger<StockController> _logger;


    public StockController(ILogger<StockController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Stocks> Get()
    {
        var updatedStocks = StockSymbols.Select(symbol => new Stocks
        {
            TimeStamp = DateTime.Now,
            CurrentPrice = Random.Shared.Next(10, 55),
            Symbol = symbol
        }).ToArray();

        foreach (var stock in updatedStocks)
        {
            StockHistories.Add(new StockHistory
            {
                Symbol = stock.Symbol,
                Price = stock.CurrentPrice,
                TimeStamp = stock.TimeStamp
            });
        }

        return updatedStocks;
    }

    [HttpGet("{symbol}/history")]
    public ActionResult<IEnumerable<StockHistory>> GetHistory(string symbol)
    {
        var history = StockHistories.Where(h => h.Symbol == symbol)
                                    .OrderByDescending(h => h.TimeStamp)
                                    .ToList();

        if (!history.Any())
            return NotFound("No history available for the specified symbol.");

        return Ok(history);
    }
}

public class Stocks
{
    public DateTime TimeStamp { get; set; }
    public int CurrentPrice { get; set; }
    public string Symbol { get; set; }
}

public class StockHistory
{
    public string Symbol { get; set; }
    public int Price { get; set; }
    public DateTime TimeStamp { get; set; }
}
