import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const CARD_WIDTH = SCREEN_WIDTH * 0.85
const CARD_HEIGHT = SCREEN_HEIGHT * 0.25

const ScrollCursor = () => {
  const [savedItems, setSavedItems] = useState<number[]>([])
  const [likedItems, setLikedItems] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const flatListRef = useRef(null)
  const intervalRef = useRef(null)
  const isInteracting = useRef(false)

  // Sample data - you can replace with your actual data
  const cardData = [
    {
      id: 1,
      image: require('../assets/image1.jpg'),
      title: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomatoes and mozzarella',
      rating: 4.5,
      tags: ['#veg', '#italian']
    },
    {
      id: 2,
      image: require('../assets/image2.jpg'), // Make sure to add your images
      title: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomatoes and mozzarella',
      rating: 4.5,
      tags: ['#veg', '#italian']
    },
    {
      id: 3,
      image: require('../assets/image3.jpg'), // Make sure to add your images
      title: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomatoes and mozzarella',
      rating: 4.5,
      tags: ['#veg', '#italian']
    },
    // Add more items as needed
  ]

  const extendedData = [...cardData, ...cardData, ...cardData]

  useEffect(() => {
    if (flatListRef.current && cardData.length > 0) {
      const initialIndex = cardData.length
      try {
        flatListRef.current.scrollToIndex({
          index: initialIndex,
          animated: false,
        })
        setCurrentIndex(initialIndex)
      } catch (error) {
        console.log('Scroll error:', error)
      }
    }
  }, [cardData.length])

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!isInteracting.current && flatListRef.current) {
        const nextIndex = (currentIndex + 1) % extendedData.length
        try {
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          })
          setCurrentIndex(nextIndex)
        } catch (error) {
          console.log('Auto scroll error:', error)
        }
      }
    }, 5000)
  }

  const handleScrollBegin = () => {
    isInteracting.current = true
    clearAutoScroll()
  }

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(offsetX / (CARD_WIDTH + 20))
    
    if (newIndex < cardData.length) {
      try {
        flatListRef.current.scrollToIndex({
          index: newIndex + cardData.length,
          animated: false,
        })
        setCurrentIndex(newIndex + cardData.length)
      } catch (error) {
        console.log('Scroll error:', error)
      }
    } else if (newIndex >= cardData.length * 2) {
      try {
        flatListRef.current.scrollToIndex({
          index: newIndex - cardData.length,
          animated: false,
        })
        setCurrentIndex(newIndex - cardData.length)
      } catch (error) {
        console.log('Scroll error:', error)
      }
    } else {
      setCurrentIndex(newIndex)
    }
    
    isInteracting.current = false
    startAutoScroll()
  }

  // Add scroll to failed handler
  const onScrollToIndexFailed = (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500))
    wait.then(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: info.index,
          animated: true
        })
      }
    })
  }

  const toggleSave = (id: number) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleLike = (id: number) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const renderItem = ({ item, index }) => (
    <View key={`${item.id}-${index}`} style={styles.card}>
      <Image source={item.image} style={styles.image} />
      
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.tagContainer}>
          {item.tags.map((tag, idx) => (
            <Text key={idx} style={styles.tag}>{tag}</Text>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => toggleSave(item.id)}>
            <Ionicons 
              name={savedItems.includes(item.id) ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color="#000" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Ionicons 
              name={likedItems.includes(item.id) ? "heart" : "heart-outline"} 
              size={24} 
              color="#000" 
            />
          </TouchableOpacity>

          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={extendedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.scrollContainer}
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollToIndexFailed={onScrollToIndexFailed}
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + 20,
            offset: (CARD_WIDTH + 20) * index,
            index,
          })}
          initialNumToRender={cardData.length}
          maxToRenderPerBatch={cardData.length}
          windowSize={5}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerWrapper: {
    width: '100%',
    height: CARD_HEIGHT, // 25% of screen height
  },
  container: {
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    height: '100%', // Take full height of container
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '50%', // Adjust image height ratio
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
  },
})

export default ScrollCursor