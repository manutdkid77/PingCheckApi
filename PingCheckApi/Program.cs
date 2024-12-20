using PingCheckApi.Hubs;
using PingCheckApi.Services;
using PingCheckApi.Services.Background;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

builder.Services.AddTransient<IPingService, PingService>();

// this ensure the PingBackgroundService, starts automatically when the application starts
// and closes automatically when the application shutsdown
builder.Services.AddHostedService<PingBackgroundService>();

builder.Services.AddCors(options =>
{
    //get the nextjs application (front end url) from environment variable
    var frontEndUrl = Environment.GetEnvironmentVariable("FRONTEND_URL");

    if (string.IsNullOrWhiteSpace(frontEndUrl))
        return;

    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins(frontEndUrl)
        .AllowAnyHeader()
        .WithMethods("GET", "POST")
        .AllowCredentials();
    });
});

// since we are running on docker container which is isolated,
// configure Kestrel to listen on port 80
// use only in release/production
if (!builder.Environment.IsDevelopment())
{
    builder.WebHost.UseKestrel(options =>
    {
        // listen on port 80
        options.ListenAnyIP(80);
    });
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();
app.MapHub<PingHub>("/pinghub");


app.Run();
