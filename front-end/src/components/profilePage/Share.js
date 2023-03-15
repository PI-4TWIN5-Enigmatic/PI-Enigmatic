import React from 'react'

const Share = () => {
  return (
<>
           
            <div className ="col-lg-6 order-1 order-lg-2">
                        <div className ="card card-small">
                            <div className ="share-box-inner">
                                <div className ="profile-thumb">
                                    <a href="#">
                                        <figure className ="profile-thumb-middle">
                                            <img src="../assets/images/profile/profile-small-37.jpg" alt="profile picture" />
                                        </figure>
                                    </a>
                                </div>
                              
                                <div className ="share-content-box w-100">
                                    <form className ="share-text-box">
                                        <textarea name="share" className ="share-text-field" aria-disabled="true" placeholder="Say Something" data-toggle="modal" data-target="#textbox" id="email"></textarea>
                                        <button className ="btn-share" type="submit">share</button>
                                    </form>
                                </div>
                               
                                <div className ="modal fade" id="textbox" aria-labelledby="textbox">
                                    <div className ="modal-dialog">
                                        <div className ="modal-content">
                                            <div className ="modal-header">
                                                <h5 className ="modal-title">Share Your Mood</h5>
                                                <button type="button" className ="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className ="modal-body custom-scroll">
                                                <textarea name="share" className ="share-field-big custom-scroll" placeholder="Say Something"></textarea>
                                            </div>
                                            <div className ="modal-footer">
                                                <button type="button" className ="post-share-btn" data-dismiss="modal">cancel</button>
                                                <button type="button" className ="post-share-btn">post</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>



</> 

)
}

export default Share