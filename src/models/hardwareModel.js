class Hardware{
    constructor(name, serial){
        this.name = name
        this.serial = serial
    }


    static async getAll(conn, skip, limit, searchColumn = null, search = null, sortColumn = null, sortType = null){

        let queryString = "SELECT hardware_serial as serial, name FROM hardware";
        let queryParams = [];
        
        if(searchColumn !== null){
            queryString += `\n WHERE ? = ?`;
            queryParams.push(searchColumn, search)
        }

        if(sortColumn !== null){
            queryString += `\n ORDER BY ${sortColumn} ${sortType}`;
        }

        queryString += `\n LIMIT ?, ?`;
        queryParams.push(skip, limit);

        let hardwares = await conn.query(queryString, queryParams);

        return hardwares.map(
            hardware => new Hardware(hardware.name, hardware.serial)
        );
    }
}

module.exports = Hardware;

