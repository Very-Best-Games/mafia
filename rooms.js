// const ROOMS = new Array();
const ROOMS =[];
ROOMS.push(new Room());

function Room() {
    this.id = ROOMS.length + 1;
    this.room_users = [];

    this.get_id = function() {
        return(this.id);
    };

    this.roomates = function() {
        return(this.room_users);
    };

    this.addRoomates = function(new_user_in_room) {
        this.room_users.push(new_user_in_room)
        return(this.room_users);
    };

  }


module.exports.addRoom = () => {
    let new_room = new Room();
    ROOMS.push(new_room);

    return ('A New room created. The rooms is:' + new_room.get_id());
};

module.exports.getRoomById = (id_room) => {
    id_room=Number(id_room);
    console.log(id_room);
    if (ROOMS.findIndex(x => x.id === id_room) !== -1) {
        let index_room = ROOMS.findIndex(x => x.id === id_room);
        console.log('Найденный номер:', index_room, ', Запрошенный номер:', id_room, ROOMS[index_room]);
        return (ROOMS[index_room]);
    } else {return ('Error 404. The room not found')}
};

module.exports.getAllRooms = () => {
    return (ROOMS);
};

module.exports.join_room = (id_room, user) => {
    id_room=Number(id_room);
    if (ROOMS.findIndex(x => x.id === id_room) !== -1) {
        let index_room_for_join = ROOMS.findIndex(x => x.id === id_room);
        console.log(index_room_for_join, ROOMS, id_room);
        let room_for_join = ROOMS[index_room_for_join];
        room_for_join.addRoomates(user);
        return ('Joined room:' + index_room_for_join);
    } else {return ('Error 404. The room not found')};
};

