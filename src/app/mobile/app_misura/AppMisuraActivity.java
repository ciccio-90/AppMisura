package app.mobile.app_misura;

import android.os.Bundle;
import app.mobile.app_misura.R;
import org.apache.cordova.DroidGap;

public class AppMisuraActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setIntegerProperty("splashscreen", R.drawable.splashscreen_preloader);
		super.loadUrl("file:///android_asset/www/index.html", 10000);
	}

}
