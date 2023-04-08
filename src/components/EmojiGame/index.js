/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

import {Component} from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {clickedEmojiList: [], isGameInProgress: true, topScore: 0}

  resetGame = () => {
    this.setState({clickedEmojiList: [], isGameInProgress: true})
  }

  renderScorecard = () => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isWon = clickedEmojiList.length + 1 === emojisList.length
    const score = clickedEmojiList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={score}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore
    if (currentScore > topScore) {
      newTopScore = currentScore
    }
    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  getShuffledEmojiList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isEmojiPresent = clickedEmojiList.includes(id)
    const clickedEmojisLength = clickedEmojiList.length
    const isWon = clickedEmojiList.length + 1 === emojisList.length
    console.log(clickedEmojisLength + 1)

    if (isEmojiPresent || isWon) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      this.setState(prevState => ({
        clickedEmojiList: [...prevState.clickedEmojiList, id],
      }))
    }
  }

  renderEmojiList = () => {
    const shuffledEmojisList = this.getShuffledEmojiList()
    return (
      <div className="emoji-alignment">
        <ul className="emoji-list-container">
          {shuffledEmojisList.map(eachEmoji => (
            <EmojiCard
              key={eachEmoji.id}
              emojiDetails={eachEmoji}
              clickEmoji={this.clickEmoji}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {clickedEmojiList, isGameInProgress, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojiList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />
        <div className="emoji-game-body">
          {isGameInProgress ? this.renderEmojiList() : this.renderScorecard()}
        </div>
      </div>
    )
  }
}
export default EmojiGame
