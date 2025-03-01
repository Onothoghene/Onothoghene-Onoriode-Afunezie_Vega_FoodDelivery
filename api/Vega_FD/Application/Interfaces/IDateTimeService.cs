﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IDateTimeService
    {
        DateTime NowUtc { get; }
        DateTime EpocToDateTime(string date);
        string DateTimeToEpoc(DateTime date);
    }
}
