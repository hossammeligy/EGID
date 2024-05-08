using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private static readonly List<Orders> _orders = new List<Orders>
        {
           
        };

        // GET: /Orders
        [HttpGet]
        public IEnumerable<Orders> GetOrders()
        {
            return _orders;
        }

        // GET: /Orders/{id}
        [HttpGet("{id}")]
        public ActionResult<Orders> GetOrder(int id)
        {
            var order = _orders.FirstOrDefault(o => o.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        // POST: /Orders
        [HttpPost]
        public ActionResult<Orders> CreateOrder(Orders order)
        {
            order.OrderId = _orders.Any() ? _orders.Max(o => o.OrderId) + 1 : 1;
            _orders.Add(order);
            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
        }
    }
}
