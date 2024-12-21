# Use the official .NET SDK image to build and publish the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the .csproj file and restore dependencies
COPY ["PingCheckApi.csproj", "./"]
RUN dotnet restore "./PingCheckApi.csproj"

# Copy the remaining source code and build the application
COPY . .
RUN dotnet publish "PingCheckApi.csproj" -c Release -o /app/publish

# Use the official .NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Define a build argument for the FRONTEND_URL
ARG FRONTEND_URL

# Set the environment variable from the build argument
ENV FRONTEND_URL=${FRONTEND_URL}

# Copy the published application files
COPY --from=build /app/publish .

# Configure the entry point for the application
ENTRYPOINT ["dotnet", "PingCheckApi.dll"]