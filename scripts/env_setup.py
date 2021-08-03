import sys, getopt
import os
import re
script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

env_file = "../.env"
path = os.path.join(script_dir, env_file)


def main(argv):
    envname = ''
    try:  
      opts, args = getopt.getopt(argv,"e:",["env="])
    except getopt.GetoptError as err:
      print(str(err))
      sys.exit(2)
    for current_argument, current_value in opts:
        if current_argument in ("-e", "--env"):
            envname = current_value
    
    with open(path, 'r') as f:
        content = f.read()
        f.close()

    with open(path, 'w') as f:
        line = f"\nNODE_ENV={envname}\n"
        final_content = re.sub(r"\nNODE_ENV=.*\n", line, content)
        f.write(final_content)
        f.close()
        # print(f'env_setup.py: setting up .env as "{envname}"')


if __name__ == "__main__":
  try:
    main(sys.argv[1:])
  except Exception as e:
    print('.env file not found')
    sys.exit(1)