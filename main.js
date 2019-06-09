const csvFilePath = './data.csv';
const csv = require('csvtojson');
csv()
    .fromFile(csvFilePath)
    .then((collection) => {
        var freq = {};
        collection.forEach(function (w) {
            if (!freq[w.writer_id]) {
                freq[w.writer_id] = 0;
            }
            freq[w.writer_id] += 1;
        });

        var published = {};
        const Writerarray = Object.entries(freq);
        total = 300; count = 0;
        while (total > 0) {
            for (let i = 0; i < Writerarray.length; i++) {

                if (!published[Writerarray[i][0]]) {
                    published[Writerarray[i][0]] = 0;
                }
                if (Writerarray[i][1] > 0) {
                    Writerarray[i][1] = Writerarray[i][1] - 1;
                    published[Writerarray[i][0]] += 1;
                    total -= 1;
                    count += 1;
                    //****** To increase  happyness of the more tales writer */
                    // Below 5 line of code increse more tales writer happyness but decrease overall happyness
                    // Try below code with commenting them and by un-commenting them
                    if (Writerarray[i][1] > 10) {
                        Writerarray[i][1] = Writerarray[i][1] - 1;
                        published[Writerarray[i][0]] += 1;
                        total -= 1;
                        count += 1;
                    }
                    //******************************************************* */
                    if (total == 0) {
                        break;
                    }
                }
            }
        }
        const publishesArray = Object.entries(published);
        const WrittenTales = Object.entries(freq);
        totaHappyness = 0;
        writerHappeness = {};
        calculateHappyness();
        function calculateHappyness() {
            for (let i = 0; i < WrittenTales.length; i++) {
                writerHappeness['writer_id'] = WrittenTales[i][0];
                writerHappeness['Happeness'] = (publishesArray[i][1] / WrittenTales[i][1]) * 100;
                totaHappyness += writerHappeness['Happeness'];
                writerHappeness['Unhappyness'] = 100 - writerHappeness['Happeness'];
                console.log(writerHappeness); // print all writer happeness and unhappeness
            }
        }
        totaHappyness = Math.ceil(totaHappyness / 75);
        console.log("Total Happyness", totaHappyness + "%");
        console.log("Total UnHappyness", 100 - totaHappyness + "%");
    });