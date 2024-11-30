using Microsoft.AspNetCore.Mvc;
using PingCheckApi.Services;

namespace PingCheckApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PingController : ControllerBase
    {
        readonly IPingService _pingService;
        readonly IConfiguration _configuration;

        public PingController(IPingService pingService, IConfiguration configuration)
        {
            _pingService = pingService;
            _configuration = configuration;
        }

        [HttpGet("check")]
        public async Task<IActionResult> Check()
        {
            try
            {
                var cloudflare = _configuration.GetValue<string>("PingHosts:cloudflare1");

                var status = await _pingService.CheckInternet(cloudflare);
                if (status)
                    return Ok("Good");
            }
            catch (Exception ex)
            {
            }
            return StatusCode(StatusCodes.Status500InternalServerError, "Internet is down");
        }
    }
}
