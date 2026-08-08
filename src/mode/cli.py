import argparse
import json

from .validate import validate_csv


def main():
    parser = argparse.ArgumentParser(prog="mode")
    sub = parser.add_subparsers(dest="command", required=True)
    validate = sub.add_parser("validate")
    validate.add_argument("csv")
    args = parser.parse_args()
    if args.command == "validate":
        print(json.dumps(validate_csv(args.csv), indent=2))


if __name__ == "__main__":
    main()
