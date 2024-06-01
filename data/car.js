class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`)
    }

    go() {
        if (!this.isTrunkOpen) {
            if (this.speed + 5 <= 200) {
                this.speed += 5;
            }
        } else {
            alert('Close the trunk first!');
        }
    }

    brake() {
        if (this.speed - 5 >= 0) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        } else {
            alert('Stop the car first!');
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

const toyota = new Car({
    brand: 'Toyota',
    model: 'Corolla'
});
const tesla = new Car({
    brand: 'Tesla',
    model: 'Model 3'
});
console.log(toyota)
console.log(tesla)

toyota.go();
toyota.displayInfo();   
toyota.brake();
toyota.openTrunk();
toyota.displayInfo();

tesla.go();
tesla.go();
tesla.brake();
tesla.brake();
tesla.openTrunk();
tesla.closeTrunk();
tesla.go();
tesla.displayInfo();

class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration
    }

    go() {
        if (this.speed + this.acceleration <= 300) {
            this.speed += this.acceleration;
        }
    }

    openTrunk() {
        console.log('Race cars do not have a trunk')
    };

    closeTrunk() {
        console.log('Race cars do not have a trunk')
    };

}
const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});
console.log(raceCar);

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.brake();
raceCar.displayInfo();
raceCar.openTrunk()
raceCar.closeTrunk()