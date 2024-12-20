# use official .NET sdk image to build and publish the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy the .csproj file and restore dependencies
COPY ["PingCheckApi.csproj", "./"]
RUN dotnet restore "./PingCheckApi.csproj"

# copy the remaining source code and build the application
COPY . .
RUN dotnet publish "PingCheckApi.csproj" -c Release -o /app/publish

# use the official .NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "PingCheckApi.dll"]