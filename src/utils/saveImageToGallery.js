import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'

export const saveImageToGallery = async (imageUri) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access camera roll is required to save images.')
      return
    }

    const tmpFile = await FileSystem.downloadAsync(
      imageUri,
      FileSystem.cacheDirectory + 'tmp_image.png'
    )

    const asset = await MediaLibrary.createAssetAsync(tmpFile.uri)

    const albums = await MediaLibrary.getAlbumsAsync()
    let joulebotAlbum = albums.find(album => album.title === 'Joulebot')
    if (!joulebotAlbum) {
      joulebotAlbum = await MediaLibrary.createAlbumAsync('Joulebot', asset, false)
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], joulebotAlbum, false)
    }

    alert('Image saved to Joulebot ablum.')
  } catch (error) {
    console.error('Error saving image: ', error)
  }
}
