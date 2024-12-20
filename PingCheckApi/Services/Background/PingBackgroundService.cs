using Microsoft.AspNetCore.SignalR;
using PingCheckApi.Hubs;

namespace PingCheckApi.Services.Background
{
    public class PingBackgroundService : BackgroundService
    {
        readonly IHubContext<PingHub> _pingHubContext;
        readonly IConfiguration _configuration;
        readonly IPingService _pingService;
        readonly IWebHostEnvironment _webHostEnvironment;

        public PingBackgroundService(IHubContext<PingHub> pingHubContext, IConfiguration configuration, IPingService pingService, IWebHostEnvironment webHostEnvironment)
        {
            _pingHubContext = pingHubContext;
            _configuration = configuration;
            _pingService = pingService;
            _webHostEnvironment = webHostEnvironment;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var configurationKey = "PingHosts:cloudflare1";
            var hostName = _configuration.GetValue<string>(configurationKey);
            if (string.IsNullOrWhiteSpace(hostName))
                throw new InvalidOperationException($"{configurationKey} value is null or empty from configuration");

            while (!stoppingToken.IsCancellationRequested)
            {
                var pingResult = await _pingService.CheckInternet(hostName);
                if (_webHostEnvironment.IsDevelopment())
                    Console.WriteLine(pingResult);
                await _pingHubContext.Clients.All.SendAsync("ReceiveStatus", pingResult);

                // Delay for half a second between pings
                await Task.Delay(500, stoppingToken);
            }
        }
    }
}
