const Query = {
    statsCount(parent, args, {db}, info) {
        console.log("statsCount");
        let s;
        if (args.severity === undefined) {
            s = -1;
        } else {
            s = args.severity;
        }
        if (args.locationKeywords.length === 0) {
            return null;
        } else {
            const p = db.people.filter((person) => {
                return person.severity > s;
            })
            let count = [];
            for (let i = 0; i < args.locationKeywords.length; ++i) {
                count.push(p.filter((person) => {
                    return person.location.description.includes(args.locationKeywords[i])
                }).length)
            }
            return count;
        }
    }
}

export { Query as default };