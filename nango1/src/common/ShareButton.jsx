import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  HatenaIcon,
  LineIcon,
  TwitterIcon,
} from "react-share";

const URL = 'https://example.com/';
const QUOTE = '共有するときのメッセージ';

const ShareButton = ({shareUrl, msg}) => {
  return (
    <div>
      <TwitterShareButton url={shareUrl} title={msg}>
        <TwitterIcon size={24} round />
      </TwitterShareButton>
      &nbsp;&nbsp;
      <FacebookShareButton url={shareUrl} quote={msg}>
        <FacebookIcon size={24} round />
      </FacebookShareButton>
      &nbsp;&nbsp;
      <LineShareButton url={shareUrl} title={msg} >
        <LineIcon size={24} round />
      </LineShareButton>
    </div>
  )
}

export default ShareButton;