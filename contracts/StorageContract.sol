pragma solidity ^0.4.0;

contract StorageContract {
    struct Person {
        string name;
        uint age;
    }

    mapping(address => Person) public people;
    address[] public peopleAddresses;


    function setData(string _name, uint _age) public {
        Person memory newPerson = Person({
            name: _name,
            age: _age
        });

       people[msg.sender] = newPerson;
       peopleAddresses.push(msg.sender);
    }

    function getPersonData(address _address) public view returns (string, uint) {
        return (
          people[_address].name,
          people[_address].age
        );
    }

    function getPeopleAddresses() view public returns(address[]) {
        return peopleAddresses;
    }
}
