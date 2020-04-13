# Loghog

Expressive log management for your server.

### Before you begin

1. Install docker + docker-compose (engine 19.03 or greater)

### Production

Build the project and create executable:
```
make && make build
```

Run the daemon:
```
chmod +x ./dist/loghog-<your-platform>
./dist/loghog
```

### Configurations

##### Setting the logging level for express:
```
DEBUG=debug ./dist/loghog
```

##### Setting the api address and host:
```
API_HOST=my.ip.address API_PORT=3000 ./dist/loghog
```

##### Setting the log extension types (delimited by commas):
```
LOG_TYPES=.log,.txt ./dist/loghog
```

### API

1. /files - viewing all available log files
```
curl http://localhost:3000/files
```

2. /files/<filename> - viewing the specified log file contents

The attributes `limit` and `filter` can be used to further increase your search. `limit` will limit the amount of rows that will be returned. `filter` will do a basic text search of a line in the file and return those results that match.

```
curl http://localhost:3000/files/<mylogfilename>
curl http://localhost:3000/files/<mylogfilename>?limit=10
curl http://localhost:3000/files/<mylogfilename>?filter=<text>
curl http://localhost:3000/files/<mylogfilename>?limit=10&filter=<text>
```

### Development

##### Build the project:
```
make
```

The development server will be started, by default, at localhost:3000. See above for configuration options. Additionally, any local file change that is made in `src` will rebuild the application and restart the server.

##### Run some tests:
```
make test
```

### Considerations

- When reading a file, we are storing all elements in an array and then iterate backwards.
    - Ideally we would want a more performant way to do this: keeping track of the last line read in the file for subsequent requests, caching, etc.
    - This is OK for now cause we'll assume that log files are around 50mb/100mb range for best practices HOWEVER depending on the box size.. this daemon does not work for lower memory systemss
- We use `shift` and `push` when a limit is involved so we are only storing as much data as we need for the limit in memory
- Used express instead of something like fastify because it is known more for other devs. If we see that users are having problems with too many requests to their servers/endpoints then we can switch to something more performant
- This repo does not require NodeJS to run a full server for dev environment, which makes it easy for cross platform development.

### Enhancements

- Versioning of API... express has a bunch of patterns to do this but was overkill for the example I am creating
- Unzip other files? (gz, zip)
- Caching responses
    - setting header expiration for data on endpoints and invalidating if the data has changed
    - using redis to keep track of pointers and file changes?
- For a new project, I would use a language that has native binary support (C++, Golang, Rust).
