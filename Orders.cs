namespace Test;


    public class Orders
    {
        public int OrderId { get; set; }
        public string StockSymbol { get; set; }
        public string OrderType { get; set; }  // "buy" or "sell"
        public int Quantity { get; set; }
        public DateTime OrderTime { get; set; } = DateTime.UtcNow;
    }


