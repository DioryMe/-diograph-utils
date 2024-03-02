import { Room, RoomClient } from '@diograph/diograph'
import { ConnectionClient, ConnectionClientList } from '@diograph/diograph/types'

export const getClientAndVerify = async (
  address: string,
  clientType: string,
  availableClients: ConnectionClientList,
): Promise<ConnectionClient> => {
  const clientData = availableClients[clientType]

  if (!clientData) {
    throw new Error(`getClientAndVerify: Unknown clientType: ${clientType}`)
  }

  const client = new clientData.clientConstructor(address, clientData.credentials)
  await client.verify()

  return client
}

export const constructRoom = async (
  address: string,
  roomClientType: string,
  availableClients: ConnectionClientList,
): Promise<Room> => {
  const client = await getClientAndVerify(address, roomClientType, availableClients)
  const roomClient = new RoomClient(client)
  return new Room(roomClient)
}

export const constructAndLoadRoom = async (
  address: string,
  roomClientType: string,
  availableClients: ConnectionClientList,
): Promise<Room> => {
  const room = await constructRoom(address, roomClientType, availableClients)
  await room.loadRoom(availableClients)
  return room
}
