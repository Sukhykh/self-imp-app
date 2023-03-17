const Video = () => {

    return (
        <div className="video__wrapper">
            <video className="video__video" controls>
                <source type="application/x-mpegURL"
                    src="https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8" />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </div>
    )
}

export default Video


