import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
  getRating,
  getRatings,
  getEndorsments
} from '../../actions'


import LoginModal from '../Login/modal'
import EndorsmentModal from '../Endorsment/modal'
import NewEndorsment from '../Endorsment/new'
import ratingsSort from './sort'
import NewRating from './new'

import RadioButton from '../Buttons/radio'
import List, { getPageFormatter } from '../List'

import { ReactComponent as MoreIcon } from '../../images/icons/down-arrow.svg'
import { ReactComponent as NewReasonIcon } from '../../images/icons/reference.svg'
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg'
import { ReactComponent as StarIcon } from '../../images/icons/star.svg'

import { AbstractContent } from '../../utils' 
import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


const RatingPreviewLook = (props) => {
  const {
    rating,
    ratings,
    endorsments,
    user,
    ratingId,
    getRatingContext,
    getPage,
    getEndorsmentsPage
  } = props

  const [showChildren, setShowChildren] = useState(false)
  const [showNewReason, setShowNewReason] = useState(false)
  const [showNewEndorsment,setShowNewEndorsment] = useState(false)
  const [editReason, setEditReason] = useState(false)
  const [newReason, setNewReason] = useState(null)
  const [newEndorsment, setNewEndorsment] = useState(null)
  const [editionBuffer, setEditionBuffer] = useState(null)

  useEffect(() => {
    if (rating) {
      setNewReason({
        body: "",
        target_rating: rating.id,
        author_id: user.id,
        subject: rating.subject
      })
      setEditionBuffer({
        id: rating.id,
        body: rating.body,
        target_rating: rating.target_rating,
        target_bp: rating.target_bp,
        author_id: user.id,
        subject: rating.subject
      })
      setNewEndorsment({
        author_id: user.id,
        reason: rating.body,
        value: 0,
        target_id: rating.id,
        rating: rating.target_rating,
        bigpicture: rating.target_bp,
        subject: rating.subject
      })
    }
  }, [rating, user])

  const content = (rating) => {
    if (!rating) return null
    return <AbstractContent text={rating.body} />
  }

  const childrenList = (rating, ratings) => (
    <List
      name={`rating-${rating.id}-ratings-list`}
      items={ratings}
      container={(child) => <RatingPreview key={`previewrating-${child.id}`} ratingId={child.id} />}
      emptyMessage={cst.labels.BP_HAS_NO_RATING}
      sortFunc={ratingsSort}
      count={rating.ratingCount}
      getPage={
        (page, options, reqId) => getPage(page, { ...options, rating: rating.id }, reqId)
      }
      loadFirstPage={true}
    />
  )

  const newReasonButton = (
    <div className="vde header-button" onClick={() => { setShowNewReason(!showNewReason)}}>
      <NewReasonIcon className="vde header-icon is-narrow icon-button" />
    </div>
  )

  const s = rating.ratingCount > 1 ? "s" : ""
  const verb = showChildren ? " Masquer" : "Afficher"
  const showChildrenButton = (
    <div className="level is-mobile show-children">
      <div
        className="level-item show-reasons"
        onClick={() => { showChildren && setShowNewReason(false); setShowChildren(!showChildren)}}>
        <MoreIcon
          style={!showChildren ? {transition: "transform 0.5s"} : {transform: "rotate(180deg)", transition: "transform 0.5s"}}
          className="vde header-icon is-narrow icon-button"
        />
        <p className="subtitle is-narrow show-more">{`${verb} ${rating.ratingCount} raison${s}`}</p>
      </div>
    </div>
  )

  const starButton = (
    <div className="vde header-button" onClick={() => setShowNewEndorsment(!showNewEndorsment)}>
      <StarIcon className="vde header-icon is-narrow icon-button" />
    </div>
  )

  const editButton = (
    <div className="vde header-button" onClick={() => setEditReason(!editReason)}>
      <EditIcon className="vde header-icon is-narrow icon-button" />
    </div>
  )

  const endorsmentModal = (rating, user) => {
    if (!rating || !newEndorsment) return

    if (user.id === cst.GUEST_ID) {
      return (
        <LoginModal
          active={showNewEndorsment}
          setActive={setShowNewEndorsment}
        />
      )
    }

    return (
      <EndorsmentModal
        title={cst.labels.CREATE_ENDORSMENT}
        construct={
          <NewEndorsment
            data={newEndorsment}
            setData={setNewEndorsment} />
        }
        active={showNewEndorsment}
        setActive={setShowNewEndorsment}
        data={newEndorsment}
      />
    )
  }

  if (editReason) {
    return (
      <NewRating
        reason={rating}
        newReason={editionBuffer}
        setNewReason={setEditionBuffer}
        setShowNewReason={setEditReason} />
    )
  }
  return (
    <div className="vde reason">
      <li className="vde child reason">
        <div className="card-header level is-mobile">
          <div className="level-left">
            { content(rating) }
          </div>
          <div className="level-right">
            <div className="toolbar">
              { newReasonButton }
              { starButton }
              { rating.author_id === user.id ? editButton : null }
            </div>
          </div>
        </div>
      </li>
      <li className={`vde child reason ${!showChildren ? "is-closed" : ""}`}>
        { rating.ratingCount !== 0 ? showChildrenButton : null }
        { showNewReason
          ? <NewRating
            newReason={newReason}
            setNewReason={setNewReason}
            setShowNewReason={(bool) => {
              setShowNewReason(bool)
              setShowChildren(true)
            }} />
          : null }
        { showChildren ? childrenList(rating, ratings) : null }
      </li>
      { endorsmentModal(rating, user) }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  rating: state.get("ratings").find((rating) => rating.id == ownProps.ratingId),
  ratings: state.get("ratings").filter((rating) => rating.target_rating == ownProps.ratingId),
  endorsments: state.get("endorsments").filter((endorsment) => endorsment.rating == ownProps.ratingId),
  user: state.get("user")
})

const mapDispatchToProps = (dispatch) => ({
  getRatingContext: (ratingId) => getRating(ratingId),
  getPage: getPageFormatter(dispatch, getRatings),
  getEndorsmentsPage: getPageFormatter(dispatch, getEndorsments)
})

const RatingPreview = connect(mapStateToProps, mapDispatchToProps)(RatingPreviewLook)

export default RatingPreview
