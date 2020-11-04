'use strict';
const { useState } = React;

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  if (liked) return 'You liked already';

  return (
    <button onClick={() => setLiked(true) }>
      Like
    </button>   
  )
}

let domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />, domContainer);