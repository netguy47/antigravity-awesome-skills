#!/usr/bin/env python3
"""
Execute script for 00-andruia-consultant skill.
This is a simple implementation that echoes the input arguments.
"""
import json
import sys

def main():
    # Combine all arguments after script name (in case JSON has spaces)
    if len(sys.argv) < 2:
        print(json.dumps({
            "status": "error",
            "error": "Usage: execute.py '<json_args>'"
        }), file=sys.stderr)
        sys.exit(1)
    
    # Get the JSON argument (handle both quoted and unquoted)
    args_json = ' '.join(sys.argv[1:])
    
    # Strip surrounding quotes if present
    if (args_json.startswith("'") and args_json.endswith("'")) or \
       (args_json.startswith('"') and args_json.endswith('"')):
        args_json = args_json[1:-1]
    
    # Handle empty or invalid input
    if not args_json or args_json == '{}':
        args = {}
    else:
        try:
            args = json.loads(args_json)
        except json.JSONDecodeError as e:
            print(json.dumps({
                "status": "error",
                "error": f"Invalid JSON arguments: {e}",
                "received": args_json[:100]  # Show first 100 chars for debugging
            }), file=sys.stderr)
            sys.exit(1)
    
    # Simple response: echo back the arguments with a success message
    result = {
        "status": "success",
        "skill": "00-andruia-consultant",
        "message": "Skill executed successfully!",
        "input_arguments": args,
        "output": f"Consultant skill processed request with {len(args)} argument(s): {json.dumps(args)}"
    }
    
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
