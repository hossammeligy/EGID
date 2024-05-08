using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FeedbackController : ControllerBase
    {
        private static readonly List<Feedback> _feedbacks = new List<Feedback>();

        // GET: /Feedbacks
        [HttpGet]
        public IEnumerable<Feedback> GetFeedback()
        {
            return _feedbacks;
        }

        // POST: /Feedbacks
        [HttpPost]
        public ActionResult<Feedback> PostFeedback([FromBody] Feedback feedback)
        {
            if (feedback == null || string.IsNullOrEmpty(feedback.email) || string.IsNullOrEmpty(feedback.feedback))
            {
                return BadRequest("Invalid feedback data");
            }

            _feedbacks.Add(feedback);
            return CreatedAtAction(nameof(PostFeedback), new { id = _feedbacks.Count - 1 }, feedback);
        }
    }
}
