function getKafkaUsers(lines){
    let isWrite = false
    let result = []
    for (i in lines){
        let line = lines[i]
        if (line.includes("kafka_users = [")){
            isWrite = true
        }
        else if(isWrite){
            if(line.includes(']')){
                return result
            }
            result.push(line.replaceAll('"', "").replaceAll(',', '').trim())
        }
    }
    return result
}
function getKafkaTopics(lines){
    let isWrite = false
    let isWriteUserRoles = false

    let result = []

    let currentService = undefined
    let closeLine = 0
    for (i in lines){
        let line = lines[i]
        if(line.includes('}')){
            closeLine += 1
        }
        else{
            closeLine = 0
        }
        if(closeLine == 3){
            return result
        }

        if(isWrite && !isWriteUserRoles && line.includes('}')){
            isWrite = false
        }

        if(!isWriteUserRoles && !isWrite && line.includes('= {')){
            isWrite = true
        }

        if (line.includes("kafka_topics = {")){
            isWrite = true
        }
        else if(isWrite){
            if(isWriteUserRoles && line.includes('}')){
                isWriteUserRoles = false
            }
            if(isWriteUserRoles){
                name_user = line.split('=')[0].trim()
                role_user = line.split('=')[1].trim().replaceAll("\"", "").replaceAll("[", "").replaceAll("]", "")
                roles_user = role_user.split(',')
                result[currentService][name_user] = []
                result[currentService][name_user].push(...roles_user)
            }
            if (line.includes('= {') && !line.includes('user_roles = {')){
                currentService = line.split('=')[0].trim().replaceAll('\"', "").replaceAll('\n"', "")
                result[currentService] = []
            }
            if (line.includes('user_roles = {')){
                isWriteUserRoles = true
            }
        }
    }
    return result
}
module.exports = {
    getKafkaUsers,
    getKafkaTopics
};