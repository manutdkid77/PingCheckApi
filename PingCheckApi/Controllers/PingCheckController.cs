using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;

namespace PingCheckApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PingCheckController : ControllerBase
    {
        public async Task<IActionResult> Get()
        {
            try
            {
                Ping ping = new Ping();
                for (var i = 0; i < 100; i++)
                {
                    try
                    {
                        PingReply reply = await ping.SendPingAsync("1.1.1.1");
                        if (reply.Status == IPStatus.Success)
                            return Ok();
                    }
                    catch { }
                }
            }
            catch (Exception ex)
            {
            }
            return StatusCode(StatusCodes.Status500InternalServerError, "Internet is down");
        }
    }
}
