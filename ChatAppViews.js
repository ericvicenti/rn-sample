
import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const PEOPLE = ['Hedger Wang', 'Reem Helou', 'Spencer Ahrens', 'Christopher Chedeau', 'Brent Vatne', 'Gerald Monaco'];
const COLORS = ['#456AB9','#3AAD84','#A82C86','#A96936'];

function Person(props) {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.personRow}>
        <View style={[styles.personRowIcon, {backgroundColor: props.color}]} />
        <Text style={styles.personRowText}>{props.name}</Text>
      </View>
    </TouchableHighlight>
  );
}

export function ChatList(props) {
  return (
    <ScrollView style={styles.chatList}>
      <Text style={styles.contextRow}>Chat App</Text>
      {PEOPLE.map((name, index) =>
        <Person
          name={name}
          color={COLORS[index % COLORS.length]}
          onPress={() => {
            props.onChatSelect(name);
          }}
        />
      )}
    </ScrollView>
  );
}

export function Chat(props) {
  return (
    <View style={styles.chatContainer}>
    <ScrollView style={styles.chat}>
      <Text style={styles.contextRow} onPress={props.onChatListPress}>{props.name}. Tap to see all</Text>
      <View style={styles.chatBubbleRow}>
        <View style={styles.chatBubbleIcon} />
        <View style={styles.chatBubbles}>
          <View style={styles.chatBubble}>
            <Text style={styles.chatBubbleText}>
              In quis nunc erat. Donec nec est risus. Vivamus cursus nisi commodo sodales malesuada. Ut in dictum lacus, et faucibus metus. Aenean laoreet suscipit sapien. Ut malesuada massa.
            </Text>
          </View>
          <View style={styles.chatBubble}>
            <Text style={styles.chatBubbleText}>
              In quis nunc erat. Donec nec est risus. Vivamus cursus nisi commodo sodales malesuada. Ut in dictum lacus, et faucibus metus. Aenean laoreet suscipit sapien. Ut malesuada massa.
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.chatBubbleRow, styles.chatBubbleRowReversed]}>
        <View style={styles.chatBubbles}>
          <View style={[styles.chatBubble, styles.chatBubbleReversed]}>
            <Text style={[styles.chatBubbleText, styles.chatBubbleTextReversed]}>
              In quis nunc erat. Donec nec est risus. Vivamus cursus nisi commodo sodales malesuada. Ut in dictum lacus, et faucibus metus. Aenean laoreet suscipit sapien. Ut malesuada massa.
            </Text>
          </View>
        </View>
        <View style={[styles.chatBubbleIcon, styles.chatBubbleIconReversed]} />
      </View>
      <View style={styles.chatBubbleBottomSpace} />
    </ScrollView>
    <View style={styles.chatInputBar}>
      <View style={styles.chatInputBarInput}>
        <Text style={styles.chatInputBarText}>Reply to {props.name}..</Text>
      </View>
      <Text style={styles.chatInputButton}>Send</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatList: {
    flex: 1,
  },
  chat: {
    flex: 1,
  },
  contextRow: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  chatBubbleRow: {
    flexDirection: 'row',
  },
  chatBubbleRowReversed: {
    justifyContent: 'flex-end',
  },
  chatBubbles: {
    marginVertical: 5
  },
  chatContainer: {
    flex: 1,
  },
  chatBubbleIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#456AB9',
    margin: 5,
    marginVertical: 7,
  },
  chatBubbleIconReversed: {
    backgroundColor: '#333',
  },
  chatBubble: {
    backgroundColor: '#456AB9',
    padding: 10,
    width: 230,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    alignSelf: 'flex-start',
    marginVertical: 2,
  },
  chatBubbleReversed: {
    borderTopLeftRadius: null,
    borderTopRightRadius: 0,
    backgroundColor: '#eee',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  chatBubbleText: {
    color: 'white',
    fontSize: 16,
  },
  chatBubbleTextReversed: {
    color: '#111',
  },
  chatBubbleBottomSpace: {
    height: 80,
  },
  chatInputBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  chatInputBarInput: {
    borderRadius: 15,
    borderTopRightRadius: 0,
    backgroundColor: '#eee',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    padding: 10,
    height: 40,
    margin: 5,
    marginRight: 62,
  },
  chatInputBarText: {
    color: '#555',
    textAlign: 'right',
    fontSize: 16,
  },
  chatInputButton: {
    color: '#333',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 16,
    right: 13,
    bottom: 15,
  },
  personRow: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: -StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  personRowText: {
    fontSize: 18,
    margin: 12,
  },
  personRowIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  scene: {
    paddingTop: 20,
  },
  title: {
    fontWeight: 'bold',
  }
});
