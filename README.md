# CommerceCraft

## How to use

- clone the repository
- build .env from the env.example template
- move to backend directory

```bash
cd backend
```

- install dependencies (a loacl virtual enviourment is recommended)

```bash
pip install -r requirments.txt
```

- make migrartions & run server

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runderver
```

- move to the frontend directory

```bash
cd ../frontend
```

- install dependencies

```bash
npm install
```

- run the frontend server

```bash
npm run dev
```

- creating a superuser to add products etc and other managemnet

```bash
python manage.py createsuper user
```

and follow the prompts

enjoy :)

## Features

- [x] Add products
- [x] Add categories
- [x] Search with image
- [x] will list others soon enough
