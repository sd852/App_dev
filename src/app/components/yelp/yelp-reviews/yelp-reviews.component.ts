import { Component, OnInit } from '@angular/core';
import { YelpService } from 'src/app/services/yelp.service';

@Component({
  selector: 'app-yelp-reviews',
  templateUrl: './yelp-reviews.component.html',
  styleUrls: ['./yelp-reviews.component.css']
})
export class YelpReviewsComponent implements OnInit {

  constructor(private yelpService: YelpService) { }

  rating: number = 0;
  defaultProfileImage = "../../../assets/profile.png"
  starCount: number = 5;
  color: string = "warn";

  reviewResponse :any = {
    reviews: [],
  };
  business: string = "";
  businessLoc: string = "";
  error: string = ""

  ngOnInit(): void {
  }

  setYelpReviews(res: any) {
    let responseObj = res;
    let id = responseObj.businesses[0].id;
    this.yelpService.getBusinessReviews(id, this)
  }

  getReviews(e: any) {
    e.preventDefault();
    this.getYelpReviews()
  }

  setBusinessReviews(res: any) {
    this.reviewResponse = res;
  }

  getYelpReviews() {
    if (!!this.businessLoc) {
      this.error = "";
      this.yelpService.getYelpReviews(this.business, this.businessLoc, this)
    }
    else {
      this.error = "Location field is mandatory";
    }

  }

}
