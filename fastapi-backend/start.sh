#!/bin/bash

# Start the FastAPI server in the background
poetry run fastapi dev src/main.py --host 0.0.0.0 --port 8000 --reload &

# Start the watcher script
poetry run python watcher.py

# Wait for all background jobs to finish
wait