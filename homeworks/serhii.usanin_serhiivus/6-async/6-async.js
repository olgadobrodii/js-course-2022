function CreateObject(name) {
    return {
        name,
        helthNumber: 100,
        start: undefined,
        counter: 0,
        timer: undefined,
        helthStr: 'Good',
        helthIndicators: {
            sleep: 100,
            eat: 100,
            drink: 100,
            rest: 100,
            play: 100,
        },
        changeIndicator(key, duration, koef) {
            this.helthIndicators[key] += duration * koef;
            if (koef > 0) {
                this.helthIndicators[key] = Math.min(100, this.helthIndicators[key]);
            }
        },
        sleep(duration) {
            this.changeIndicator('sleep', duration, 1);
            this.changeIndicator('rest', duration, 1);
            this.changeIndicator('drink', duration, -0.5);
            this.changeIndicator('eat', duration, -0.5);
            this.changeIndicator('play', duration, -0.5);
        },
        eat(duration) {
            this.changeIndicator('eat', duration, 10);
            this.changeIndicator('sleep', duration, -1);
            this.changeIndicator('drink', duration, -1);
            this.changeIndicator('play', duration, -1);
        },
        drink(duration) {
            this.changeIndicator('drink', duration, 10);
            this.changeIndicator('sleep', duration, -1);
            this.changeIndicator('drink', duration, -1);
            this.changeIndicator('play', duration, -1);
        },
        rest(duration) {
            this.changeIndicator('rest', duration, 10);
            this.changeIndicator('sleep', duration, -0.5);
            this.changeIndicator('eat', duration, -0.5);
            this.changeIndicator('drink', duration, -0.5);
            this.changeIndicator('play', duration, -1);
        },
        play(duration) {
            this.changeIndicator('play', duration, 1);
            this.changeIndicator('sleep', duration, -1);
            this.changeIndicator('eat', duration, -1);
            this.changeIndicator('drink', duration, -1);
        },

        checkHelth() {
            const calculateHelthNumber = () => {
                let maxTotal = 0;
                let total = 0;
                const keys = Object.keys(this.helthIndicators);
                keys.forEach((key) => {
                    maxTotal += 100;
                    total += this.helthIndicators[key];
                });
                return Math.round((total / maxTotal) * 100);
            };
            const calculateHelthStr = () => {
                if (this.helthCount > 80) return 'Perfect';
                if (this.helthCount > 40) return 'Good';
                if (this.helthCount > 0) return 'Bad';
                return 'Dead';
            };
            this.helthNumber = calculateHelthNumber();
            this.helthStr = calculateHelthStr();
        },
        doMetod() {
            const metods = [this.play, this.drink, this.eat, this.rest, this.sleep];
            const index = Math.round(Math.random() * (metods.length - 1));
            const duration = Math.round(Math.random() * 100);
            metods[index].call(this, duration);
            this.checkHelth();
        },
        stop(message) {
            clearTimeout(this.timer);
            console.log(message);
            const end = new Date().getTime();
            const age = Math.round((end - this.start) / 1000);
            console.log(`life duration: ${age}s`);
        },
        toLive() {
            this.counter++;
            if (this.start === undefined) {
                this.start = new Date().getTime();
            }
            console.log(this.helthNumber);
            if (this.counter === 100) {
                this.stop.call(this, 'Timet overflow');
            } else if (this.helthNumber <= 0) {
                this.stop.call(this, 'Dead');
            } else {
                this.doMetod();
                this.timer = setTimeout(this.toLive.bind(this), 500);
            }
        },
    };
}

const sirko = CreateObject('Sirko');
sirko.toLive();
