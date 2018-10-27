//
//  LightPin.swift
//  Luna_Backend
//
//  Created by Heath Raftery on 26/10/18.
//  Copyright © 2018 Heath Raftery. All rights reserved.
//

import Foundation
import MapKit

class LightPin: NSObject, MKAnnotation
{
    let title: String?
    let locationName: String
    let discipline: String
    let coordinate: CLLocationCoordinate2D
    
    init(title: String, locationName: String, discipline: String, coordinate: CLLocationCoordinate2D)
    {
        self.title = title
        self.locationName = locationName
        self.discipline = discipline
        self.coordinate = coordinate
        
        super.init()
    }
    
    var subtitle: String?
    {
        return locationName
    }
}
