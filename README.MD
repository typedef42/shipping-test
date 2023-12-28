# Developer Evaluation Test

Welcome to the Hydrapa Developer Evaluation Test!  
This test is designed to assess your skills in both backend and frontend development.  
Please follow the instructions below to complete the test.

## Instructions

### Setup Instructions

1. Fork & Clone this repository.
2. Install dependencies: `yarn`
3. Run the backend & frontend: `yarn dev`
4. The backend server will be running at http://localhost:3042.
5. The frontend will be running at http://localhost:3000.

### Submission

1. Fork the repository
2. Create a new branch for your changes: `git checkout -b feature/my-test-branch`.
3. Commit your changes: `git commit -m "feat(scope): Implement solution"`.
4. Push your changes: `git push origin feature/my-test-branch`.
5. Create a pull request against the `main` branch.

## Objectives

### Context

You are building the new Hydrapa shipping platform to optimize shipping route between countries. Shipping cost is mainly determined by the travel distance between locations.
The shipping service is available between certain different countries and through different ports on those countries.

### Requirements (Backend)

Build a backend api route that take into input source and destination country, and that compute the cheapest route port to port.  
For example, given CountryA with portA1, portA2, portA3 and CountryB with portB1, portB2, portB3.  
Cheapest route from CountryA to CountryB would be the smaller distance between ports of that country, let's say PortA2 to PortB3 hypothetically.  

- The endpoint should be accessible through `/shipment/find-best-route/:countryDeparture/:countryArrival`

- To determine distance between ports of each available countries, use the PortModule.  
two endpoint exists in the PortModule:  
--> /port/distance/Marseille/Venice that give the distance between two ports  
--> /port/list that give the list of declared ports in available countries  

- Add in the ShipmentModule the required controller, command, services or whatever you need

- If the route required does not exist (because country is not available, or because port is not declared in this country), handle error appropriately.

- explain your architecture and choices in app/backend/README.MD

### Requirements (Frontend)

Build the UI that can interact with the backend `find-best-route` api.

- Display a simple but nice and sexy UI that allow to select source country and destination country, and a button that query the backend to calculate the cheapest route. (you can use free components from https://tailwindui.com/components)

- Nicely display the cheapst route found, with the source and destination ports of that country, and the distance between the two.

- Handle the update of the source and destination country to refresh the result

- explain your architecture and choices in app/frontend/README.MD

- Bonus: display all available routes from the source and destination country, in a nicer UI, with the cheapest route showed highlighted

## Evaluation Criteria

- **Code Quality:** Clean, well-documented, and maintainable code.
- **Functionality:** Successful implementation of the specified features.
- **Testing:** Include relevant tests for your code.
- **Submission:** Proper use of branches and a clear pull request.

## Questions or Issues

If you have any questions or encounter issues during the test, please contact me by mail or slack.

Best of luck!