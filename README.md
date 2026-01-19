# Vendzy flash sale starter

This project is a technical demonstration of a microservices-based e-commerce architecture designed to handle high-concurrency "Flash Sale" events. The primary goal is to ensure data consistency and prevent overselling when multiple users attempt to purchase limited inventory at the same millisecond.

## How to run the project

Clone the repository to your local machine:

```sh
git clone https://github.com/yhtiee/Vendzy-Challenge.git
```

At the root of the project install dependencies:

```sh
pnpm install
```

Create environment variables for each service:

- At the root of the project open the .env.example, copy the contents. Create a .env file at the root of the project and paste the contents you copied.
- Open the web folder `apps/web` open the .env.example, copy the contents. Create a .env file in the web folder and paste the contents you copied.
- Open the order-service folder `apps/order-service` open the .env.example, copy the contents. Create a .env file in the order-service folder and paste the contents you copied.
- Open the inventory-service folder `apps/inventory-service` open the .env.example, copy the contents. Create a .env file in the inventory-service folder and paste the contents you copied.

(locally):

- Run the following commands from the root of the project:
```sh
cd apps/inventory-service
pnpm run start:dev
cd ..
cd apps/order-service
pnpm run start:dev
cd ..
cd apps/web
pnpm run dev
```
- The inventory service will be running on http://localhost:3001
- The order service will be running on http://localhost:3002
- The web app will be running on http://localhost:3000

(docker):

- If you don't have docker installed or setup on your system visit this link to setup docker [Docker Setup](https://www.docker.com/get-started/)
- Run this command from the root of the project:
```sh
docker-compose up
```
- While running `docker-compose up` you might encounter an error while starting up postgres that says that the port is already used. This means you already have postgres running on that port on your system. To solve this on windows search for services. Open the services app and search for postgress, then stop all running postgress processes
- Then you can re-run `docker-compose up`
- When the containers have been successfully started the frontned (client) will be running on http://localhost:3000

## Architecture Decision Record

Project structure:
- The project was built using turbo to create a mono-repo. Why a monorepo? Reason for choosing a monorepo is becuase I want all the services to exist in one place(repo) instead of having them across different repos this will make it easire to manage, maintain, scale and test. 
- Frontend (client) was built using Next.js
- Inventory Service was built using Nest.js 
- Order Service was built using Nest.js

Database:
- Redis: I used redis in the inventory service to manage the inventory data. Why? The goal of the project is a flash sale which mean see need fast inventory retervals and updates. With redis read and write operations are more faster that normal databases so I leverage on this speed. Another reason was it was used to manage the race condition which will be explained in the next section. 
- Postgres: I used postgres in the order service to manage the order data/history. Why? Postgres gurrantees uncorrupted, reliable and data integrity from the start of the transaction till its completed even during a crash.

Race Conditions:
- This project's goal was to tackle possible race condition occurences during the flash sale. What is a race condition? A race condition is a consition that happens when more than one operation try to change the same data at the same time. From my research I noticed the "race" shows that the outcome is dependent on which ever operation fininshes first wins. In a real world example, imagin you and your frined try to pick up a banana at the same time? Yes what happens is called a race condition because who ever picks it up first wins. But this isn't a good thing in software as it is when competitng with your friend for a banana, it can cause issues and example of an issue is imagine this flash sale product was live without the solution to handle race conditions and we had just one product, two users attempted to buy that product at the exact same time what ends up happening is that we have successful sold two products when we had only one product which is bad.
- How did I handle the race condition?. I picked redis as the databse to manage inventory because it has inbuilt capability to handle race conditions through atomicity, I used a lua script(bundles to whole read, check and write into one single execution) to run a command to reserve a product while this is executing no other command can execute until this has finished.

Communication:
- I went with REST because as the term implies a flash sale so I would belive we want our users to enjoy the ux of speed in placing thier orders and gettin immeditae feedback if it was successful or not (synchronous) using events would involve having to wait and get feed backs through mails. Also a personal tradeoff I made was the project is small, simple presentation of one of the ways to solve race conditions, I belive that in huge production systems event driven approavh with more advance frameworks would be much more recommended ducle to scale and maintainability.