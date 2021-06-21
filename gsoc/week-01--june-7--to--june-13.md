# week-01--june-7--to--june-13

## 1 What have you been doing this week?

- Learned the main usage of MNE-BIDS
- Making a test conversion of source brainvision data to bids, making sure the eeg data was automatically downloaded
- Characterizing the relevant bids-information that MNE reads
- Designing the translation rules file (ended up being a yaml file)
- Going to the meetings with my mentors.
- Met the team of EZbids

## 2 What are you planning to do next week?

- Participate in the OHBM Brainhack 2021, where the idea is to help the bidscoin team.
- Finish and document the alpha version of the "Translation Rules" configuration file, then pass it to my mentors for feedback.
- Make a high-level test using a bids validator (that is, be able to produce a valid bids-eeg directory).
- Find or write a test routine that checks if two BIDS outputs are identical.
- Implement CI through github actions

## 3 Is anything blocking your progress?

Not particularly, It has been hard knowing how to deal with the huge amount of information bids is able to carry. It is also hard dealing with what MNE infers from the files, since those fields depend on the eeg-formats along with more variables. As of now, the decision was to give priority to "required" bids information; we must assure this required information always exist whether from MNE reading or user-input.
