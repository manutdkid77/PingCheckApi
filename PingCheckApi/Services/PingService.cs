using System.Net.NetworkInformation;

namespace PingCheckApi.Services
{
    public class PingService : IPingService
    {
        public async Task<bool> CheckInternet(string hostName)
        {
            try
            {
                Ping ping = new Ping();
                PingReply reply = await ping.SendPingAsync(hostName);
                if (reply.Status == IPStatus.Success)
                    return true;
            }
            catch
            {

            }
            return false;
        }
    }
}
