
namespace PingCheckApi.Services
{
    public interface IPingService
    {
        Task<bool> CheckInternet(string hostName);
    }
}